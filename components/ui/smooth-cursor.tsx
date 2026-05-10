"use client";

import { useEffect } from "react";
export interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}
export function SmoothCursor(_props: SmoothCursorProps) {
  useEffect(() => {
    // Đảm bảo con trỏ mặc định luôn hiển thị khi component này được render
    document.body.style.cursor = "auto";

    // Hàm dọn dẹp để đảm bảo con trỏ được đặt lại nếu component bị unmount
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []); // Mảng phụ thuộc rỗng có nghĩa là hiệu ứng này chạy một lần khi mount và dọn dẹp khi unmount
  return null;
}
