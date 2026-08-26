import { useState } from "react";
import { motion } from "motion/react";

// TEMPORARY diagnostic route — delete after use.
export function MotionTestPage() {
  const [on, setOn] = useState(false);
  return (
    <div style={{ padding: 80, minHeight: "100vh", background: "#fff" }}>
      <button
        id="mt-toggle"
        onClick={() => setOn((v) => !v)}
        style={{ padding: 16, fontSize: 20, border: "2px solid #000" }}
      >
        toggle (on={String(on)})
      </button>
      <motion.div
        id="mt-box"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: on ? 1 : 0.15, x: on ? 200 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          marginTop: 40,
          width: 120,
          height: 120,
          background: "crimson",
        }}
      />
    </div>
  );
}
