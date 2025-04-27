
import React from 'react';

interface ProductExperienceProps {
  experience?: string[];
  whyChoose?: string[];
  emotionalJourney?: string;
}

const ProductExperience = ({ experience, whyChoose, emotionalJourney }: ProductExperienceProps) => {
  if (!experience && !whyChoose && !emotionalJourney) return null;
  
  return (
    <>
      {experience && (
        <div className="border-t border-luxury-gray my-3 pt-3">
          <h4 className="text-gold text-xs font-medium mb-2">THE EXPERIENCE</h4>
          <div className="grid grid-cols-2 gap-2">
            {experience.map((exp, index) => (
              <div key={index} className="text-xs text-gray-300 flex items-center gap-1">
                <span className="text-gold">•</span> {exp}
              </div>
            ))}
          </div>
        </div>
      )}

      {(whyChoose || emotionalJourney) && (
        <div className="border-t border-luxury-gray my-3 pt-3">
          <h4 className="text-gold text-xs font-medium mb-2">
            {whyChoose ? "WHY CHOOSE THIS FRAGRANCE" : "EMOTIONAL JOURNEY"}
          </h4>
          <p className="text-xs md:text-sm text-gray-300 italic">
            {whyChoose ? whyChoose[0] : emotionalJourney}
          </p>
        </div>
      )}
    </>
  );
};

export default ProductExperience;
