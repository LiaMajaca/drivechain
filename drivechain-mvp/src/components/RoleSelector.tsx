import React from 'react';

interface RoleSelectorProps {
  onSelectRole: (role: 'driver' | 'officer' | 'insurer') => void;
  currentRole: 'driver' | 'officer' | 'insurer';
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole, currentRole }) => {
  const buttonClass = (role: 'driver' | 'officer' | 'insurer') =>
    `px-8 py-4 text-lg font-bold rounded-lg shadow-lg transition-all duration-300
    ${currentRole === role
      ? 'bg-blue-600 text-white scale-105'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
    }`;

  return (
    <div className="flex justify-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <button
        className={buttonClass('driver')}
        onClick={() => onSelectRole('driver')}
      >
        👤 I'm a Driver
      </button>
      <button
        className={buttonClass('officer')}
        onClick={() => onSelectRole('officer')}
      >
        👮 I'm a Traffic Officer
      </button>
      <button
        className={buttonClass('insurer')}
        onClick={() => onSelectRole('insurer')}
      >
        🏢 I'm an Insurer
      </button>
    </div>
  );
};

export default RoleSelector;