import PageBanner from "@/components/PageBanner";
import Faq from "@/components/Faq";
import CtaBanner from "@/components/CtaBanner";

export const metadata = { title: "FAQ | Insuro Africa" };

export default function FaqPage() {
  return (
    <div className="bg-canvas">
      <PageBanner
        eyebrow="FAQ"
        title="Frequently asked questions"
        sub="Quick answers about licensing, plans, onboarding and claims."
      />
      <Faq />
      <CtaBanner />
    </div>
  );
}
