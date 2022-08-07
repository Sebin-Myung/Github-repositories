import { firstCharUpperCase } from "./Header";
import { VscCheck, VscClose, VscTriangleDown } from "react-icons/vsc";
import DetailsMenu from "./DetailsMenu";
import { RadioFilter } from "../config/radioFilter";

interface DropdownProps {
  checkedValue: string | null;
  name: keyof RadioFilter;
  title: string;
  options: { [name: string]: string };
  onRadioClick: Function;
}

const Dropdown = ({ checkedValue, name, title, options, onRadioClick }: DropdownProps) => {
  return (
    <details className="relative" id={`${name}-options`}>
      <summary className="border rounded-md px-3 py-1 flex items-center gap-2 bg-gray-100 hover:border-gray-600">
        <p className="text-sm font-semibold">{firstCharUpperCase(name)}</p>
        <VscTriangleDown size={10} className="fill-gray-600" />
      </summary>
      <DetailsMenu role="menu">
        <div className="absolute filter:right-0 w-52 m-2 text-xs flex flex-col border rounded-md bg-gray-100">
          <header className="pl-4 pr-2 py-1 flex justify-between items-center">
            <p className="font-semibold">select {title}</p>
            <VscClose
              className="cursor-pointer"
              onClick={() => (document.querySelector(`#${name}-options > summary`) as HTMLElement)?.click()}
            />
          </header>
          {Object.keys(options).map((optionName) => (
            <label
              key={options[optionName]}
              tabIndex={0}
              role="menuitemradio"
              className="flex items-center gap-2 text-xs pl-4 pr-2 py-1 border-t cursor-pointer hover:bg-gray-200"
              onClick={() => onRadioClick(options[optionName])}
            >
              <input type="radio" hidden name={name} value={options[optionName]} />
              <VscCheck className={checkedValue === options[optionName] ? "visible" : "invisible"} />
              {optionName}
            </label>
          ))}
        </div>
      </DetailsMenu>
    </details>
  );
};

export default Dropdown;
