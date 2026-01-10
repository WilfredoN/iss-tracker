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
  <header className="flex flex-row items-stretch gap-2">
    <Input
      placeholder="SEARCH..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      className="flex-1"
    />
    <Button onClick={onAddClick}>Add</Button>
  </header>
);
