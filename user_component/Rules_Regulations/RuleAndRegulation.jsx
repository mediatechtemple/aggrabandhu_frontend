"use client";
// import urlApi from "@/utils/api";
import React, { useEffect, useState } from "react";

const RuleAndRegulation = () => {
const [rules, setRules] = useState('');
 const urlApi= "https://backend.aggrabandhuss.org/api";
  const handelPrivatePolicy = async () => {
    try {
      const data = await fetch(`${urlApi}/rule`);

      const result = await data.json();

      setRules(result[0].rule);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handelPrivatePolicy();
  }, []);
  return (
    <>
      <div className="mt-20 max-w-4xl mx-auto px-4">
        <div dangerouslySetInnerHTML={{ __html: rules }} />
      </div>
    </>
  );
};

export default RuleAndRegulation;