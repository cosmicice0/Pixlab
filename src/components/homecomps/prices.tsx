import React from "react";

const Prices = () => {
  const pricingCards = [
    {
      title: "Basic",
      price: "50.00",
      features: ["Front-End Website", "HTML and CSS", "Unlimited Revisions"],
    },
    {
      title: "Standard",
      price: "100.00",
      features: ["Back-End Website", "React or Node.js", "Unlimited Revisions"],
    },
  ];

  return (
    <section className=" text-white flex flex-col w-full justify-center items-center my-[13%] max-md:my-0">
      <h1 className="text-center text-4xl">
        Our <span className="text-red-600 text-4xl font-bold">Pricing</span>
      </h1>
      <div className="flex w-[70%] justify-between items-center">
        <div className=" mt-10 flex justify-around  w-full flex-wrap">
          {pricingCards.map((card, index) => (
            <div
              key={index}
              className="cursor-pointer bg-[#333] min-w-[350px] p-6 rounded-lg shadow-lg text-center m-5 hover:scale-125 hover:duration-150 ease-in-out max-md:min-w-[250px]"
            >
              <h2 className="text-3xl font-semibold mb-4 ">{card.title}</h2>
              <p className="price text-2xl mb-4 text-[#EE412B]">£{card.price}</p>
              <ul className="features mb-4">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="mb-2 flex border-b-2 my-4 border-[#555]">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Prices;
