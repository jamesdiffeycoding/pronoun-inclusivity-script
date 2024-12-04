import "./globals.css";

export const metadata = {
  title: "Pronoun inclusivity script",
  description: "A simple script to make text gender-neutral.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
