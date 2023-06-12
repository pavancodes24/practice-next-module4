import path from "path";
import fs from "fs/promises";

const ProductDetailpage = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>...loading</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

export default ProductDetailpage;

// export async function getStaticProps() {
//     return {
//         props:{}
//     }
// }

export const getStaticProps = async (context) => {
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);
  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { pid: "p1" } },
      // { params: { pid: "p2" } },
      // { params: { pid: "p3" } },
    ],
    fallback: true,
    // fallback:'blocking'
  };
};
