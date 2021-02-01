import React from "react";
import { Button } from "reactstrap";

const Tool = ({ label, id, title, subTitle, items, toggle }) => {
  return (
    <div>
      <h4 className="border-bottom border-primary">{title}</h4>
      <p>{subTitle}</p>
      <ul>
        {items && items.map(item => (
          <li>
            <p className="m-0">{item.name}:</p>
            <ul>
              <li>Mapped: {item.mapped}</li>
              <li>Not mapped: {item.notMapped}</li>
            </ul>
          </li>
        ))}
      </ul>
      <h3>
        <Button color="link" onClick={() => toggle(id, label)}>
          {label}
        </Button>
      </h3>
    </div>
  );
};

export default Tool;
