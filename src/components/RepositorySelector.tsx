import { Check, ChevronDown, FolderGit2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "./ui/utils";

export interface Repository {
  id: string;
  externalId: string;
  repo: string;
  link: string;
  createdAtExternal: string;
  updatedAtExternal: string;
}

interface RepositorySelectorProps {
  repositories: Repository[];
  selectedRepositories: string[];
  onSelectionChange: (selected: string[]) => void;
}

export function RepositorySelector({ 
  repositories, 
  selectedRepositories, 
  onSelectionChange 
}: RepositorySelectorProps) {
  const [open, setOpen] = useState(false);

  const toggleRepository = (repoId: string) => {
    const isSelected = selectedRepositories.includes(repoId);
    if (isSelected) {
      onSelectionChange(selectedRepositories.filter(id => id !== repoId));
    } else {
      onSelectionChange([...selectedRepositories, repoId]);
    }
  };

  const selectAll = () => {
    onSelectionChange(repositories.map(r => r.id));
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  const getDisplayText = () => {
    if (selectedRepositories.length === 0) {
      return "Select repositories";
    }
    if (selectedRepositories.length === repositories.length) {
      return "All repositories";
    }
    if (selectedRepositories.length === 1) {
      const repo = repositories.find(r => r.id === selectedRepositories[0]);
      return repo?.repo || "1 repository";
    }
    return `${selectedRepositories.length} repositories`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between text-xs sm:text-sm w-full sm:w-[280px]"
        >
          <div className="flex items-center gap-2 truncate">
            <FolderGit2 className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{getDisplayText()}</span>
          </div>
          {selectedRepositories.length > 0 && selectedRepositories.length < repositories.length && (
            <Badge variant="secondary" className="ml-2 rounded-full px-2 py-0 text-xs">
              {selectedRepositories.length}
            </Badge>
          )}
          <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search repositories..." className="h-9" />
          <CommandList>
            <CommandEmpty>No repositories found.</CommandEmpty>
            <CommandGroup>
              <div className="flex items-center justify-between px-2 py-1.5 border-b">
                <span className="text-xs text-muted-foreground">
                  {selectedRepositories.length} of {repositories.length} selected
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={selectAll}
                  >
                    All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={clearAll}
                  >
                    Clear
                  </Button>
                </div>
              </div>
              {repositories.map((repo) => {
                const isSelected = selectedRepositories.includes(repo.id);
                return (
                  <CommandItem
                    key={repo.id}
                    onSelect={() => toggleRepository(repo.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <div
                        className={cn(
                          "h-4 w-4 border rounded flex items-center justify-center flex-shrink-0",
                          isSelected ? "bg-primary border-primary" : "border-input"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm truncate">{repo.repo}</span>
                        <span className="text-xs text-muted-foreground truncate">
                          {repo.link}
                        </span>
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
