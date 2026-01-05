import Image from 'next/image';

interface EatSuggestionCardProps {
  imageSrc: string;
  title: string;
}

export default function EatSuggestionCard({ imageSrc, title }: EatSuggestionCardProps) {
  return (
    <div className="flex-1 bg-white border-2 border-primary_button rounded-3xl md:rounded-4xl overflow-hidden">
      <div className="relative aspect-4/3 md:aspect-[1.2/1]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover scale-[1.02]"
        />
      </div>
      <p className="text-lg md:text-2xl font-medium text-center py-4 md:py-6">
        {title}
      </p>
    </div>
  );
}
