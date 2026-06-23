import { PublicBirthdayPage } from "@/components/PublicBirthdayPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RootBirthdayPage({ params }: PageProps) {
  const { slug } = await params;

  return <PublicBirthdayPage slug={slug} />;
}
