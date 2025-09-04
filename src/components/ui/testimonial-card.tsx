interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

const TestimonialCard = ({ quote, author, role, company, image }: TestimonialCardProps) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
      {/* 5-star rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
      
      <blockquote className="text-muted-foreground mb-6 leading-relaxed text-lg">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt={author}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <p className="font-bold text-lg text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">
            {role} at {company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;