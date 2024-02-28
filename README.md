# LootCode CLI

LootCode CLI is a command-line interface (CLI) tool for interacting with LeetCode, providing various functionalities such as logging in, logging out, configuring settings, submitting solutions, retrieving solutions, and automating problem solving and submission.
## Installation

To install LootCode CLI, make sure you have Node.js installed on your system. Then, run the following command:

```bash
npm install -g lootcode
```


## Usage

After installation, you can use the `lc` command to access the LootCode CLI tool. Here are the available commands and their usage:
### Logging In

To log in to your LeetCode account, use the following command:

```bash
lc login
```


### Logging Out

To log out from your LeetCode account, use the following command:

```bash
lc logout
```


### Configuration

You can configure default settings such as language and file for submissions using the `config` command:

```bash
lc config -l <language> -f <file>
```


### Submitting Solutions

To submit a solution for a specific problem, use the following command:

```bash
lc submit <problem_slug> -l <language> -f <file>
```


### Retrieving Solutions

To retrieve the solution for a specific problem, use the following command:

```bash
lc solution <problem_slug>
```


### Automated Problem Solving and Submission

You can request to solve and submit a problem automatically using the following command:

```bash
lc please <problem_slug>
```


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

