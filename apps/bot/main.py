import asyncio
import os

from aiogram import Bot, Dispatcher, F, types
from aiogram.filters import Command
from aiogram.types import Message
from aiogram.fsm.context import FSMContext
from requests import RequestException
from api import register_user
from dto import Registration, UserCreateDTO
from prompts import LOGIN_PROMPT, PASSWORD_PROMPT, LOCATION_PROMPT

BOT_TOKEN = os.getenv("TELEGRAM_TOKEN")

if not BOT_TOKEN:
    raise RuntimeError("TELEGRAM_TOKEN environment variable is required")


bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


def _location_keyboard() -> types.ReplyKeyboardMarkup:
    buttons = [[types.KeyboardButton(text="Share Location", request_location=True)]]
    return types.ReplyKeyboardMarkup(keyboard=buttons, resize_keyboard=True)


async def _prompt_for_location(message: Message) -> None:
    await message.answer(LOCATION_PROMPT, reply_markup=_location_keyboard())


@dp.message(Command("start"))
async def start(message: Message, state: FSMContext):
    await state.set_state(Registration.login)
    await message.answer(LOGIN_PROMPT)


@dp.message(Registration.login)
async def get_login(message: Message, state: FSMContext):
    await state.update_data(login=message.text)
    await state.set_state(Registration.password)
    await message.answer(PASSWORD_PROMPT)


@dp.message(Registration.password)
async def get_password(message: Message, state: FSMContext):
    await state.update_data(password=message.text)
    await state.set_state(Registration.location)
    await _prompt_for_location(message)


@dp.message(Registration.location, F.location)
async def get_location(message: Message, state: FSMContext):
    location = message.location
    data = await state.get_data()

    login = data.get("login")
    password = data.get("password")

    if not (login and password and location):
        await message.answer(
            "Incomplete data. Please restart registration with /start."
        )
        await state.clear()
        return

    payload = UserCreateDTO(
        login=login,
        password=password,
        latitude=location.latitude,
        longitude=location.longitude,
        chat_id=message.chat.id,
    )
    try:
        await asyncio.to_thread(register_user, payload)

    except RequestException:
        await message.answer("Could not register. Please try again soon.")
        return

    await message.answer(
        f"Registration successful for {payload.login} at {location.latitude:.4f}, {location.longitude:.4f}!"
    )
    await state.clear()


async def main() -> None:
    await dp.start_polling(bot)  # type: ignore


if __name__ == "__main__":
    asyncio.run(main())
