import { useQuery, gql } from "@apollo/client";

export const ProductsList = () => {
  const products = gql`
    {
      getProductById(productId: "1") {
        id
        name
        description
      }
    }
  `;

  const { data } = useQuery(products);

  return (
    <div>
      <h1>Products</h1>
      {data && (
        <ul>
          (
          <li>
            <p>id: {data.getProductById.id}</p>
            <p>name: {data.getProductById.name}</p>
            <p>description: {data.getProductById.description}</p>
          </li>
          )
        </ul>
      )}
    </div>
  );
};
