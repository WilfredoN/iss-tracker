from aiogram.fsm.state import State, StatesGroup


class Registration(StatesGroup):
    login = State()
    password = State()
    location = State()


class UserCreateDTO:
    def __init__(
        self, login: str, password: str, latitude: float, longitude: float, chat_id: int
    ):
        self.login = login
        self.password = password
        self.latitude = latitude
        self.longitude = longitude
        self.chat_id = chat_id
