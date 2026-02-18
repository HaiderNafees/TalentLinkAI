interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="space-y-1.5">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base text-muted-foreground font-medium max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
