import path from "path";
import fs from "fs/promises";

import Link from "next/link";

const HomePage = (props) => {
  const { products } = props;
  return (
    <ul>
      {/* <li>Product 1</li>
      <li>Product 2</li>
      <li>Product 3</li> */}
      {products?.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;

//calling get static props so it is prerendered
export async function getStaticProps() {
  console.log("(Re-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      // products: [{ id: "p1", title: "Product 1" }],
      products: data.products,
    },
    revalidate: 10,
  };
}
