import React from "react";

interface TaxTableRow {
  categoria: string;
  percentual: string;
}

interface TaxTableProps {
  data: TaxTableRow[];
  className?: string;
}

export const TaxTable: React.FC<TaxTableProps> = ({ data, className = "" }) => {
  return (
    <div className={`overflow-hidden rounded-lg ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-black">
            <th 
              className="border-r border-black px-4 py-3 text-left"
              style={{ fontFamily: "'Geom', system-ui, -apple-system, sans-serif" }}
            >
              Categoria
            </th>
            <th 
              className="px-4 py-3 text-left"
              style={{ fontFamily: "'Geom', system-ui, -apple-system, sans-serif" }}
            >
              Percentual
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-black last:border-b-0">
              <td className="border-r border-black px-4 py-3 text-black">
                {row.categoria}
              </td>
              <td className="px-4 py-3 text-black">
                {row.percentual}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

