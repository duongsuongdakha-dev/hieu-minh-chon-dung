const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const resetQuiz = document.getElementById("resetQuiz");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackResult = document.getElementById("feedbackResult");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

// Địa chỉ nhận dữ liệu Google Apps Script
const DATA_URL =
  "https://script.google.com/macros/s/AKfycbxpjy66ihk82Uta6qfhimMywG8Kp-htKN0s3NYPX6QLQ3iyo2qTfIpqzXfmvZVVl54N/exec";

// Menu điều hướng
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

// Bài tự đánh giá
if (quiz && result) {
  quiz.addEventListener("submit", async function (event) {
    event.preventDefault();

    const answers = new FormData(quiz);
    const q1 = answers.get("q1");
    const q2 = answers.get("q2");
    const q3 = answers.get("q3");
    const q4 = answers.get("q4");

    // Chỉ gửi khi đã trả lời đủ bốn câu
    if (!q1 || !q2 || !q3 || !q4) {
      alert("Bạn hãy trả lời đầy đủ cả 4 câu hỏi nhé!");
      return;
    }

    const advice = [];

    if (q1 !== "yes") {
      advice.push(
        "Hãy xác định mục tiêu cá nhân và tìm hiểu xem hoạt động này có thực sự phục vụ mục tiêu đó không."
      );
    }

    if (q2 === "yes") {
      advice.push(
        "Bạn có thể đang chịu ảnh hưởng từ bạn bè. Hãy tự hỏi mình muốn tham gia vì nhu cầu thật sự hay vì lo bị bỏ lại."
      );
    } else if (q2 === "sometimes") {
      advice.push(
        "Hãy cân nhắc đâu là mong muốn của bản thân và đâu là ảnh hưởng từ môi trường xung quanh."
      );
    }

    if (q3 === "no") {
      advice.push(
        "Hãy tìm hiểu thêm về hoạt động và tự hỏi liệu nó có còn ý nghĩa với bạn nếu bạn bè không tham gia."
      );
    } else if (q3 === "sometimes") {
      advice.push(
        "Bạn có thể dành thêm thời gian để xác định động cơ của mình trước khi quyết định."
      );
    }

    if (q4 !== "yes") {
      advice.push(
        "Hãy cân nhắc thời gian, khả năng và điều kiện hiện tại. Bạn không cần tham gia mọi hoạt động cùng lúc."
      );
    }

    if (advice.length === 0) {
      advice.push(
        "Bạn đã cân nhắc các yếu tố quan trọng. Hãy tiếp tục tìm hiểu lợi ích và yêu cầu thực tế trước khi đưa ra quyết định."
      );
    }

    result.innerHTML = `
      <div class="result-card">
        <h3>Gợi ý dành cho bạn</h3>
        <p>Dựa trên câu trả lời của bạn, hãy cân nhắc những điều sau:</p>
        <ul>${advice.map(item => `<li>${item}</li>`).join("")}</ul>
        <p><strong>Ghi nhớ:</strong> Đây là công cụ tự suy ngẫm, không phải bài kiểm tra hay chẩn đoán tâm lý. Bạn là người hiểu rõ nhất hoàn cảnh và mục tiêu của mình.</p>
        <p id="saveStatus" role="status">Đang gửi câu trả lời...</p>
        <button type="button" class="button" id="tryAgain">Làm lại</button>
      </div>
    `;

    result.scrollIntoView({ behavior: "smooth", block: "start" });

    // Gửi câu trả lời đến Google Sheets qua Apps Script
    const payload = {
      goal: q1,
      motivation: q2,
      peers: q3,
      feasibility: q4
    };

    try {
      await fetch(DATA_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8"
        },
        body: JSON.stringify(payload)
      });

      const status = document.getElementById("saveStatus");
      if (status) {
        status.textContent =
          "Đã gửi yêu cầu lưu câu trả lời. Vui lòng kiểm tra bảng dữ liệu để xác nhận.";
      }
    } catch (error) {
      const status = document.getElementById("saveStatus");
      if (status) {
        status.textContent =
          "Chưa gửi được dữ liệu. Hãy kiểm tra kết nối mạng và thử lại.";
      }
    }

    const tryAgain = document.getElementById("tryAgain");

    if (tryAgain) {
      tryAgain.addEventListener("click", () => {
        quiz.reset();
        result.innerHTML = "";
        quiz.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  });

  if (resetQuiz) {
    resetQuiz.addEventListener("click", () => {
      result.innerHTML = "";
    });
  }
}

// Phản hồi về website
if (feedbackForm && feedbackResult) {
  feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selected = document.getElementById("useful").value;
    if (!selected) return;

    feedbackResult.textContent =
      "Cảm ơn bạn đã phản hồi! Nội dung bạn thấy hữu ích: " +
      selected +
      ". Phản hồi này hiện chỉ hiển thị trên trình duyệt, chưa được lưu vào Google Sheets.";
  });
}
