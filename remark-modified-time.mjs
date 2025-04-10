import { execSync } from "child_process";

export function remarkModifiedTime() {
  return function (tree, file) {
    try {
      const filepath = file.history[0];
      
      // 只使用git log获取最后提交时间
      try {
        // 使用git命令获取文件的最后提交时间
        const result = execSync(`git log -1 --pretty="format:%cI" -- "${filepath}"`, { stdio: ['ignore', 'pipe', 'ignore'] });
        const gitTime = result.toString().trim();
        
        if (gitTime) {
          console.log(`Git time for ${filepath}: ${gitTime}`);
          file.data.astro.frontmatter.lastModified = gitTime;
          return;
        } else {
          console.warn(`Git time empty for ${filepath}`);
        }
      } catch (gitError) {
        console.warn(`Git error for ${filepath}: ${gitError.message}`);
      }
      
      // 如果没有Git历史记录，设置为null
      console.log(`No git history for ${filepath}, setting lastModified to null`);
      file.data.astro.frontmatter.lastModified = null;
      
    } catch (error) {
      console.error(`Error getting modified time: ${error.message}`);
      file.data.astro.frontmatter.lastModified = null;
    }
  };
} 