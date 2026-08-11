const API_URL =
    "https://portfolio-backend-production-5e12.up.railway.app/api";

const messagesContainer =
    document.getElementById("messagesContainer");

const messageCount =
    document.getElementById("messageCount");

    
// ========================================
// LOAD MESSAGES
// ========================================

async function loadMessages() {

    try {

        messagesContainer.innerHTML = `

            <div class="messages-loading">

                <div class="loading-spinner"></div>

                <p>
                    Loading messages...
                </p>

            </div>

        `;


        const response = await fetch(
            `${API_URL}/contact`
        );


        const result =
            await response.json();


        console.log(
            "Messages API:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Failed to load messages."
            );

        }


        const messages =
            result.data || result;


        displayMessages(messages);


    } catch (error) {

        console.error(
            "Load messages error:",
            error
        );


        messagesContainer.innerHTML = `

            <div class="messages-empty">

                <div class="messages-empty-icon">
                    ⚠
                </div>

                <h3>
                    Failed to Load Messages
                </h3>

                <p>
                    Please check your backend server.
                </p>

            </div>

        `;

    }

}


// ========================================
// DISPLAY MESSAGES
// ========================================

function displayMessages(messages) {

    if (
        !Array.isArray(messages) ||
        messages.length === 0
    ) {

        messageCount.textContent =
            "0 Messages";


        messagesContainer.innerHTML = `

            <div class="messages-empty">

                <div class="messages-empty-icon">
                    ✉
                </div>

                <h3>
                    No Messages
                </h3>

                <p>
                    You don't have any messages yet.
                </p>

            </div>

        `;

        return;

    }


    messageCount.textContent =
        `${messages.length} ${
            messages.length === 1
                ? "Message"
                : "Messages"
        }`;


    messagesContainer.innerHTML =
        messages.map(message => {

            const name =
                message.name ||
                message.full_name ||
                "Unknown";


            const email =
                message.email ||
                "";


            const subject =
                message.subject ||
                "No subject";


            const content =
                message.message ||
                message.content ||
                "";


            const date =
                formatDate(
                    message.created_at ||
                    message.createdAt
                );


            return `

                <div
                    class="message-card"
                    data-id="${message.id}"
                >

                    <div class="message-card-header">

                        <div class="message-sender">

                            <h3>
                                ${escapeHtml(name)}
                            </h3>

                            <div class="message-email">
                                ${escapeHtml(email)}
                            </div>

                        </div>


                        <div class="message-date">
                            ${date}
                        </div>

                    </div>


                    <div class="message-subject">

                        Subject:

                        <span>
                            ${escapeHtml(subject)}
                        </span>

                    </div>


                    <div class="message-body">

                        ${escapeHtml(content)}

                    </div>


                    <div class="message-card-footer">

                        <span class="message-status">

                            ● New Message

                        </span>


                        <button
                            type="button"
                            class="delete-message-button"
                            onclick="deleteMessage(${message.id})"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `;

        }).join("");

}


// ========================================
// DELETE MESSAGE
// ========================================

async function deleteMessage(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this message?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/contact/${id}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        console.log(
            "Delete message:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Failed to delete message."
            );

        }


        alert(
            "Message deleted successfully."
        );


        loadMessages();


    } catch (error) {

        console.error(
            "Delete message error:",
            error
        );


        alert(
            error.message ||
            "Failed to delete message."
        );

    }

}


// ========================================
// FORMAT DATE
// ========================================

function formatDate(dateValue) {

    if (!dateValue) {
        return "Unknown date";
    }


    const date =
        new Date(dateValue);


    if (isNaN(date.getTime())) {
        return "Unknown date";
    }


    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


// ========================================
// INITIAL LOAD
// ========================================

loadMessages();