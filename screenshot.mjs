import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url = process.argv[2] || 'http://localhost:8080';
const label = process.argv[3] || '';
const dir = './temporary screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
const n = files.length + 1;
const filename = `${dir}/screenshot-${n}${label ? '-' + label : ''}.png`;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: filename, fullPage: false });
await browser.close();
console.log(filename);
