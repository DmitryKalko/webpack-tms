const path = require("path"); // библиотека для того что бы указать путь к папке

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development", // вэбпак поймет что это сборка приложения которая еще в разработке - не будет происходить минификации (сжатия)
	entry: "./src/index.js", // файл с которого будет запускаться приложение - входной

  entry: ["@babel/polyfill", "./src/index.jsx"], // для реакта

	output: {
		//сюда вэбпак будет собирать файлы в итоговый бандл
		path: path.resolve(__dirname, "dist"), // папка dist в корне приложения
		filename: "[name].[hash].js", // тут с помощью регулярного выражения говорим что нужно взять все js файлы
	},
	plugins: [
		new HtmlWebpackPlugin({ template: "./src/index.html" }),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
      // для стилей
			{
				test: /\.(css|scss)$/, // какие форматы читать
				use: ["style-loader", "css-loader", "sass-loader"], // какие лоадеры использовать и в каком прядке
			},
      // для файлов
			{
				test: /\.(jpg|jpeg|png|svg)$/,
				use: ["file-loader"],
			},
      // для babel
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
      // для React
      {
				test: /\.m?jsx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
	devServer: {
		port: 5000,
	},
};
