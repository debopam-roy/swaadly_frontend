export default function TeamSection() {
  const teamMembers = [
    {
      initial: 'P',
      name: 'Prashant',
      description: 'Clarity-driven, science-first perspective',
      bgColor: 'bg-[#44C997]',
    },
    {
      initial: 'S',
      name: 'Sonal',
      description: 'Eye for simplicity, design and honest expression',
      bgColor: 'bg-[#FFE4B4]',
    },
    {
      initial: 'A',
      name: 'Arpit',
      description: 'Structure, process awareness and operational steadiness',
      bgColor: 'bg-[#FF7E29]',
    },
  ];

  return (
    <section className="relative w-full bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="space-y-8 md:space-y-16">
          {/* Heading */}
          <div className="text-center space-y-4 md:space-y-6">
            <h2 className="font-shrikhand italic text-4xl md:text-5xl lg:text-6xl">
              Meet the team
            </h2>
            <p className="font-medium text-lg md:text-2xl max-w-3xl mx-auto">
              Three perspectives. One shared vision. Built differently every day.
            </p>
          </div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className={`${member.bgColor} border-2 border-[#333] rounded-[40px] shadow-[8px_8px_0px_0px_#333] px-6 md:px-10 py-8 md:py-10 space-y-4 md:space-y-5`}
              >
                {/* Initial Circle */}
                <div className="flex justify-center">
                  <div className="bg-white border-2 border-[#333] rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                    <span className="font-bold text-3xl md:text-4xl">
                      {member.initial}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-bold text-2xl md:text-3xl text-center">
                  {member.name}
                </h3>

                {/* Description */}
                <p className="font-medium text-lg md:text-xl text-center leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#333] rounded-[32px] px-6 md:px-8 py-8 md:py-8">
              <p className="font-medium text-white text-lg md:text-xl text-center leading-relaxed">
                None of these roles are about titles or achievements — they're simply the different lenses through which Swaadly is built every day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
