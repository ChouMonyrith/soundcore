export default function AuthLayout({ children }) {
  return (
    <div className="bg-[url('/pbcarti.jpg')] bg-cover bg-center grid grid-cols-2 min-h-screen">
      {children}
    </div>
  );
}
