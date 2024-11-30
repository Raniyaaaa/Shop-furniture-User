import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Living Room', img: 'https://static.vecteezy.com/system/resources/thumbnails/005/548/738/small_2x/interior-furniture-living-room-with-sofa-and-accessories-line-logo-icon-design-illustration-vector.jpg' },
  { name: 'Bedroom', img: 'https://static.vecteezy.com/system/resources/thumbnails/008/872/828/small_2x/bed-bedroom-thin-line-icon-illustration-logo-template-suitable-for-many-purposes-free-vector.jpg' },
  { name: 'Dining Room', img: 'https://media.istockphoto.com/id/1048162160/vector/table-and-chairs-cafe-line-icon-black-on-white-isolated-symbol-logo-template-outline-concept.jpg?s=612x612&w=0&k=20&c=61aBCNUPBAOK1RK9BtI2i-SExDDpNJh8gFuWovTMjKE=' },
  { name: 'Work From Home', img: 'https://media.istockphoto.com/id/132073059/vector/desk.jpg?s=612x612&w=0&k=20&c=gGGLc10PlYC_GxWlB7y-lHxgGvl442Wr_CyQ7ZK6DLQ=' },
];

const CategoryList = () => {
  return (
    <div style={{paddingRight:'25px',paddingLeft:'25px',}}>
      <div style={{ textAlign: 'center', marginTop: '40px',boxShadow: '0 5px 25px rgba(0,0,0,0.1)',padding:'2rem' ,borderRadius:'10px'}}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>Shop By Category</h2>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', gap: '20px'}}>
        {categories.map((category, index) => (
          <Link key={index} to={`/category/${category.name}`} style={{ textDecoration: 'none' }}>
            <div style={{ textAlign: 'center'}}>
              <img
                src={category.img}
                alt={category.name}
                style={{ width: '100px', height: '70px', objectFit: 'contain' }}
              />
              <p style={{ fontSize: '14px', color: '#333' }}>{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CategoryList;
