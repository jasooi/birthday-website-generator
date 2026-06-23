import Image from "next/image";

export function BirthdayReveal({
  friendName,
  message,
  photoUrl,
  fallbackMemeId,
  revealBackgroundColor
}: {
  friendName: string;
  message: string;
  photoUrl: string | null;
  fallbackMemeId: number;
  revealBackgroundColor: string;
}) {
  const imageSrc = photoUrl ?? `/memes/meme-${fallbackMemeId}.jpg`;

  return (
    <section
      className="flex min-h-screen items-center justify-center px-4 py-10"
      style={{
        backgroundColor: revealBackgroundColor,
        fontFamily: '"Times New Roman", Times, serif'
      }}
    >
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-6xl">
          Happy birthday {friendName}!
        </h1>
        <div className="mx-auto mt-8 aspect-[4/3] w-full max-w-xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
          <Image
            src={imageSrc}
            alt={`Birthday image for ${friendName}`}
            width={900}
            height={675}
            priority
            className="h-full w-full object-cover"
            sizes="(max-width: 640px) 92vw, 560px"
          />
        </div>
        <p className="mx-auto mt-7 max-w-2xl text-xl font-medium leading-8 text-slate-800">
          {message}
        </p>
      </div>
    </section>
  );
}
