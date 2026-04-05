"use client";
import LearnPage from "../page";

export default function DynamicLearnTopicPage() {
  // Re-use the exact same Learn UI component, which now natively supports grabbing the [topic] string from the url path!
  return <LearnPage />;
}
