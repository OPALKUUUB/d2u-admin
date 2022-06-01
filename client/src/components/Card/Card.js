const Card = ({ children, header = false, title }) => {
  return (
    <div className="card mb-3">
      {header && <h5 className="card-header">{title}</h5>}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
