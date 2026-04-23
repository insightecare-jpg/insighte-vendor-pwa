export function CheckoutShell({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full items-start">
      {/* Main Content */}
      <div className="flex-1 w-full order-2 lg:order-1">{children}</div>

      {/* Sidebar - Stuck to the top */}
      <div className="w-full lg:w-[400px] shrink-0 sticky top-24 z-10 order-1 lg:order-2">
        {sidebar}
      </div>
    </div>
  );
}
