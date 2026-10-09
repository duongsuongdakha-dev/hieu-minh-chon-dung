const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

quiz.addEventListener("submit", function (event) {
  event.preventDefault();

  const answers = new FormData(quiz);

  const q1 = answers.get("q1");
  const q2 = answers.get("q2");
  const q3 = answers.get("q3");
  const q4 = answers.get("q4");

  let advice = [];

  if (q1 === "no" || q1 === "sometimes") {
    advice.push(
      "Hãy xác định rõ mục tiêu của mình và tìm hiểu xem hoạt động này có thực sự hữu ích hay không."
    );
  }

  if (q2 === "yes") {
    advice.push(
      "Bạn nên xem xét liệu mình có đang tham gia chủ yếu vì ảnh hưởng từ bạn bè hay không."
    );
  } else if (q2 === "sometimes") {
    advice.push(
      "Hãy cân nhắc giữa mong muốn cá nhân và ảnh hưởng từ những người xung quanh."
    );
  }

  if (q3 === "no") {
    advice.push(
      "Hãy tự hỏi liệu bạn có thực sự muốn tham gia nếu không có sự tác động từ bạn bè."
    );
  } else if (q3 === "sometimes") {
    advice.push(
      "Bạn có thể tìm hiểu thêm về động cơ của mình trước khi đưa ra quyết định."
    );
  }

  if (q4 === "no" || q4 === "sometimes") {
    advice.push(
      "Hãy cân nhắc thời gian, khả năng và điều kiện thực tế trước khi đăng ký."
    );
  }

  if (advice.length === 0) {
    advice.push(
      "Bạn đã cân nhắc được các yếu tố quan trọng. Hãy tiếp tục tìm hiểu lợi ích thực tế và lựa chọn phù hợp với mục tiêu của mình."
    );
  }

  result.innerHTML = `
    <article>
      <h3>Gợi ý dành cho bạn</h3>
      <p>Dựa trên câu trả lời, bạn có thể cân nhắc những điều sau:</p>
      <ul>
        ${advice.map(item => `<li>${item}</li>`).join("")}
      </ul>
      <p>
        <strong>Hãy nhớ:</strong> Không có lựa chọn nào phù hợp với tất cả mọi người.
        Kết quả này chỉ giúp bạn tự suy ngẫm, không phải đánh giá hay chẩn đoán tâm lý.
      </p>
      <button type="button" class="button" id="retry">Làm lại</button>
    </article>
  `;

  result.scrollIntoView({ behavior: "smooth", block: "start" });

  document.getElementById("retry").addEventListener("click", function () {
    quiz.reset();
    result.innerHTML = "";
    quiz.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});