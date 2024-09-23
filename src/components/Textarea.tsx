import React from 'react';
import { IconType } from 'react-icons';

interface CustomTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon: IconType;
  label: string;
}

const TextArea: React.FC<CustomTextAreaProps> = ({ icon: Icon, label, ...props }) => {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div className="mb-4">
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className="relative rounded border-2 border-gray-300 focus-within:border-[#0096c7]"
        style={ref.current && ref.current === document.activeElement ? { borderColor: '#0096c7' } : {}}
      >
        <div className="absolute top-3 left-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <textarea
          ref={ref}
          className="block w-full pl-10 pr-3 py-2 rounded focus:outline-none border-gray-300 focus:ring-[#0096c7] focus:border-[#0096c7] sm:text-sm transition duration-150 ease-in-out"
          {...props}
        />
      </div>
    </div>
  );
};

export default TextArea;