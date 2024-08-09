const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Hacker News newest page
  await page.goto("https://news.ycombinator.com/newest");
  console.log("Navigated to Hacker News newest page");

  // Function to get articles
  async function getArticles(page) {
    return await page.$$eval('.athing', articles => {
      return articles.map(article => {
        const rank = article.querySelector('.rank') ? parseInt(article.querySelector('.rank').innerText.replace('.', '')) : null;
        const title = article.querySelector('.storylink') ? article.querySelector('.storylink').innerText : null;
        const age = article.nextElementSibling.querySelector('.age') ? article.nextElementSibling.querySelector('.age').getAttribute('title') : null;
        return { rank, title, age };
      });
    });
  }

  let articles = [];
  while (articles.length < 100) {
    // Scroll to the bottom and click "More"
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    console.log("Scrolled to the bottom of the page");
    await page.waitForTimeout(2000); // Wait for the page to load more articles

    const moreButton = await page.$('a.morelink');
    if (moreButton) {
      await moreButton.click();
      console.log("Clicked the 'More' link");
    } else {
      console.log("No more 'More' link found, stopping the loading process");
      break;
    }

    // Wait for new articles to load
    await page.waitForTimeout(2000);

    // Get articles again
    const newArticles = await getArticles(page);
    articles = [...new Set([...articles, ...newArticles])]; // Append new articles to the existing array and remove duplicates
    console.log(`Loaded ${articles.length} articles`);
  }

  // Ensure we have at least 100 articles
  if (articles.length < 100) {
    throw new Error(`Less than 100 articles found: ${articles.length}`);
  }

  // Slice the array to the first 100 articles
  articles = articles.slice(0, 100);
  console.log("Found at least 100 articles, proceeding with validation");

  // Convert ages to Date objects for comparison
  const articleDates = articles.map(article => new Date(article.age));

  // Validate articles are sorted from newest to oldest
  for (let i = 0; i < articleDates.length - 1; i++) {
    if (articleDates[i] < articleDates[i + 1]) {
      throw new Error(`Articles are not sorted correctly. Article ${i} is older than Article ${i + 1}.`);
    }
  }

  console.log("Articles are sorted correctly.");

  // Close browser
  await browser.close();
}

(async () => {
  try {
    await sortHackerNewsArticles();
  } catch (error) {
    console.error(error);
  }
})();
