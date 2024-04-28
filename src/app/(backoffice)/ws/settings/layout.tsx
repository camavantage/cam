export default function WSLayoutSettings({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="block lg:hidden">{children}</div>
    </>
  );
}
