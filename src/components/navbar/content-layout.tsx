
interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({  children }: ContentLayoutProps) {
  return (
    <div className="px-[20px] md:px-[40px]">
      <div 
      >{children}</div>
    </div>
  );
}
