
import React from 'react';

interface FragranceNotesProps {
  top: string[];
  middle: string[];
  base: string[];
}

const FragranceNotes = ({ top, middle, base }: FragranceNotesProps) => {
  return (
    <div className="border-t border-luxury-gray my-3 pt-3">
      <h4 className="text-gold text-xs font-medium mb-2">FRAGRANCE NOTES</h4>
      <div className="grid grid-cols-3 gap-1 md:gap-2 mb-3">
        <div>
          <span className="text-xs text-gray-400">Top</span>
          <ul className="text-xs md:text-sm text-gray-300">
            {top.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-xs text-gray-400">Middle</span>
          <ul className="text-xs md:text-sm text-gray-300">
            {middle.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-xs text-gray-400">Base</span>
          <ul className="text-xs md:text-sm text-gray-300">
            {base.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FragranceNotes;
