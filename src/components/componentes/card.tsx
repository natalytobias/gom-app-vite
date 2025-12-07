type CardProps = {
  title?: string;
  subtitle?: React.ReactNode;
};

export function Card({ title, subtitle }: CardProps) {
  return (
    <div className=" min-h-40 text-start  text-gray-600 bg-blue-100 shadow-sm shadow-blue-300 hover:shadow-md rounded-2xl p-4 transition duration-100 w-full">
      <div className="font-bold pb-2">{title}</div>
      <div>{subtitle}</div>
    </div>
  );
}
