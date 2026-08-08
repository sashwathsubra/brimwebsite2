import React from "react";

const SeoContent = ({ title, keywords }: { title: string; keywords: string }) => {
  return (
    <div className="sr-only" aria-hidden="true">
      <h2>{title}</h2>
      <p>
        Brim Clocks is a trusted LED digital clock manufacturer in Chennai offering reliable led digital wall clocks, industrial LED displays, digital calendar clocks, jumbo LED clocks, matrix clocks, and custom display systems for banks, offices, hospitals, schools, factories, temples, mosques, churches, showrooms, and large halls.
      </p>
      <p>
        We supply high-visibility clocks for Chennai, Tamil Nadu, and all over India. Keywords include {keywords}.
      </p>
    </div>
  );
};

export default SeoContent;
