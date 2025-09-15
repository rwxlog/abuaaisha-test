async function loadPosts() {
  try {
    const response = await fetch("posts.json");
    const posts = await response.json();

    // Sort newest first
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (window.pageType === "home") {
      // GRID layout → show 6 per category
      const categories = ["faith", "social", "worldview"];
      categories.forEach(cat => {
        const container = document.getElementById(`${cat}-posts`);
        if (!container) return;

        posts.filter(p => p.category === cat).slice(0, 6)
          .forEach(post => container.innerHTML += renderPost(post, "short"));
      });
    } else {
      // CATEGORY or ALL POSTS → single-column layout
      const container = document.getElementById("category-posts");
      let filteredPosts = posts;

      if (window.pageType === "category" && window.categoryPage) {
        filteredPosts = posts.filter(p => p.category === window.categoryPage);
      }

      filteredPosts.forEach(post => container.innerHTML += renderPost(post, "long"));
    }
  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

// type = "short" for homepage grid, "long" for category/all posts
function renderPost(post, type) {
  if (type === "short") {
    return `
      <article class="card">
        <h2 class="card-title">${post.title}</h2>
        <p class="meta">${post.date} • ${post.time}</p>
        <p class="excerpt">${post.shortExcerpt}</p>
        <a class="read-more" href="${post.file}">Read more →</a>
      </article>
    `;
  } else {
    return `
      <article class="post-excerpt">
        <h2><a href="${post.file}">${post.title}</a></h2>
        <p class="meta">${post.date} • ${post.time}</p>
        <p>${post.longExcerpt}</p>
        <a class="read-more" href="${post.file}">Read more →</a>
      </article>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadPosts);
