interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
