// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeNova from 'starlight-theme-nova';
import starlightImageZoom from 'starlight-image-zoom';
import { remarkModifiedTime } from './remark-modified-time.mjs';

// https://astro.build/config
export default defineConfig({
	markdown: {
		remarkPlugins: [remarkModifiedTime],
	},
	integrations: [
		starlight({
			title: '交易日记',
			// 移除国际化配置，只使用默认语言
			plugins: [
				// 启用图片缩放功能
				starlightImageZoom(),
				// 启用Nova主题
				starlightThemeNova(),
			],
			customCss: [
				// 自定义样式路径
			],
			components: {
				// 自定义布局组件
				Footer: './src/layouts/CustomLayout.astro',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: '交易理念',
					items: [
						{ label: '序', slug: 'intro' },
					],
				},
				{
					label: '交易机会',
					items: [
						{ label: '第1周', slug: 'chance/week-1' },
						{ label: '第2周', slug: 'chance/week-2' },
					],
				},
				{
					label: '实验计划',
					items: [
						{ label: '第1周', slug: 'plan/week-1' },
					],
				},
				{
					label: '开发指南',
					items: [
						{ label: 'Steps组件示例', slug: 'guides/steps-example' },
						{ label: '图片缩放示例', slug: 'guides/image-zoom-example' },
					],
				},
			],
		}),
	],
});
