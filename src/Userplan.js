import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "./firebase-config";

const Userplan = (props) => {
  let { planName, quality, currentPlan, userId } = { ...props };

  const changePlan = async (key, planName) => {
    const userDoc = doc(db, "Netflix_Users", key);
    const updatedPlan = { Plan: planName };
    await updateDoc(userDoc, updatedPlan);
  };
  return (
    <>
      <div className="emailid h-8 text-white text-sm">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div>{planName}</div>
            <div>{quality}</div>
          </div>
          <div>
            {currentPlan === planName ? (
              <button className="p-2 w-full bg-white text-red-600 active:scale-95">
                Subscribed
              </button>
            ) : (
              <button
                className="p-2 w-full bg-red-600 active:scale-95"
                onClick={() => {
                  changePlan(userId, planName);
                }}
              >
                Subscribe
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Userplan;
