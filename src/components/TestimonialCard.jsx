import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ 
  name, 
  role, 
  content, 
  rating = 5, 
  image,
  className = '' 
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 ${className}`}
    >
      {/* Quote Icon */}
      <div className="flex justify-between items-start mb-4">
        <Quote className="w-8 h-8 text-primary-200 flex-shrink-0" />
        
        {/* Rating Stars */}
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < rating 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed">
        "{content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff&size=48`;
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary-500 rounded-full border-2 border-white"></div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
    </motion.div>
  );
};

export default TestimonialCard;