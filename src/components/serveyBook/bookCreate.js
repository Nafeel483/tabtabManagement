import React from "react";
const BookList = props => {
  return props.bookDetails.map((val, idx) => {
    let name = `name-${idx}`
    return (
      <div className="form-row" key={val.index}>
        <div style={{ marginTop: '20px', marginBottom: "20px" }}>
          <h3>Create Questions</h3>
        </div>
        <div className="col" style={{ alignSelf: "center", display: 'flex', justifyContent: 'space-between' }}>
          <input
            type="text"
            className="form-control required"
            placeholder="Questions......."
            name="name"
            data-id={idx}
            id={name}
            style={{ width: '70%', height: 40 }}
          />

          <div >
            {idx === 0 ? (
              <button
                onClick={() => props.add()}
                type="button"
                className="btn btn-primary text-center"
                style={{ width: 50, height: 40, borderRadius: 50 }}
              >
                <i className="fa fa-plus-circle" aria-hidden="true" />
              </button>
            ) : (
                <button
                  className="btn btn-danger"
                  onClick={() => props.delete(val)}
                  style={{ width: 50, height: 40, borderRadius: 50 }}
                >
                  <i className="fa fa-minus" aria-hidden="true"
                  
                  />
                </button>
              )}
          </div>
        </div>
      </div>
    );
  });
};
export default BookList;
