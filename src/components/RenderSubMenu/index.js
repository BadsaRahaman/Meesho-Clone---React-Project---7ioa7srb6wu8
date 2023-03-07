import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";

const index = ({ data }) => {
  // navSubData map ......

  return data.map((el, index) => {
    const data = el.data;
    return (
      <div key={index}>
        <div className="column">
          <h4>{el.heading}</h4>
          {data.map((d, i) => (
            <Link key={i} className="nav-link" to={routes.products.path}>
              {d}
            </Link>
          ))}
        </div>
      </div>
    );
  });
};

export default index;
