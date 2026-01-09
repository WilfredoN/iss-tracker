import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

type SatellitesPanelHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
};

export const SatellitesPanelHeader = ({
  search,
  onSearchChange,
  onAddClick,
}: SatellitesPanelHeaderProps) => (
  <header className="flex flex-row items-center gap-2">
    <Input
      placeholder="Search satellites..."
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      className="text-primary-foreground placeholder:text-primary-foreground/60 flex-1"
    />
    <Button
      variant="secondary"
      className="border-2 border-blue-400 bg-blue-400 font-semibold text-blue-950 shadow-sm hover:bg-blue-500"
      onClick={onAddClick}
    >
      Add
    </Button>
  </header>
);
