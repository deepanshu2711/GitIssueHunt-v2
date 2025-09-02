export const Heading = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <div>
      <p className="text-xl text-lime-600 font-serif">{heading}</p>
      <p className="text-muted-foreground text-sm font-serif">{description}</p>
    </div>
  );
};
