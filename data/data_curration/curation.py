import pandas as pd
import json


def setEdj(df: pd.DataFrame, key: str) -> None:
    """
    Categorize education levels in the DataFrame based on the given key.

    Parameters
    ----------
    df : pd.DataFrame
        The input DataFrame.
    key : str
        The column name to apply categorization on.

    Returns
    -------
    None
    """
    df.loc[df[key].isin(['5', '6', '7']), key] = 'VET'
    df.loc[df[key].isin(['8', '9']), key] = 'GE'
    df.loc[df[key].isin(['2', '3', '4']), key] = 'IS'
    df.loc[df[key].isin(['1']), key] = 'NET'


def load_and_clean_data(file_path: str, waves: int) -> pd.DataFrame:
    """
    Load and clean the data by removing rows with 'No valid response' for the specified number of waves.

    Parameters
    ----------
    file_path : str
        The path to the CSV file.
    waves : int
        The number of waves to check for valid responses.

    Returns
    -------
    pd.DataFrame
        The cleaned DataFrame.
    """
    df = pd.read_csv(file_path)
    
    for i in range(1, waves + 1):
        df = df[df[f't{i}bqvalids'] != 'No valid response']
    
    df.dropna(inplace=True)
    return df


def convert_and_set_education(df: pd.DataFrame, education_columns: list) -> pd.DataFrame:
    """
    Convert education columns to string after converting to integers and apply categorization.

    Parameters
    ----------
    df : pd.DataFrame
        The input DataFrame.
    education_columns : list
        List of education-related column names.

    Returns
    -------
    pd.DataFrame
        The updated DataFrame with categorized education columns.
    """
    for col in education_columns:
        df[col] = df[col].astype(int).astype(str)
        setEdj(df, col)
    return df


def filter_and_fill_data(df: pd.DataFrame, columns_to_keep: list) -> pd.DataFrame:
    """
    Filter DataFrame to keep specified columns and fill missing values with zero.

    Parameters
    ----------
    df : pd.DataFrame
        The input DataFrame.
    columns_to_keep : list
        List of column names to retain.

    Returns
    -------
    pd.DataFrame
        The filtered and filled DataFrame.
    """
    df = df[columns_to_keep]
    df = df.fillna(0)

    return df


def replace_language_region(df: pd.DataFrame, col: str) -> pd.DataFrame:
    """
    Replace numerical language region codes with string labels.

    Parameters
    ----------
    df : pd.DataFrame
        The input DataFrame.
    col : str
        The column name to apply replacements on.

    Returns
    -------
    pd.DataFrame
        The updated DataFrame with replaced values.
    """
    replacements = {1: 'GR', 2: 'FR', 3: 'IT'}
    df[col] = df[col].replace(replacements)
    return df


def group_and_calculate_weighted_counts(df: pd.DataFrame, weight_col: str, education_columns: list) -> list:
    """
    Group data by canton and education type, and calculate weighted counts.

    Parameters
    ----------
    df : pd.DataFrame
        The input DataFrame.
    weight_col : str
        The column name for weights.
    education_columns : list
        List of education-related column names.

    Returns
    -------
    list
        A list of DataFrames, each containing weighted counts for one wave.
    """
    grouped_dfs = []
    
    for i, col in enumerate(education_columns):
        grouped = df.groupby(['aes_canton', col]).apply(
            lambda x: x[weight_col].sum()).reset_index(name=f'w{i + 1}_edu')
        grouped = grouped.rename(columns={col: 'education'})
        grouped_dfs.append(grouped)
    
    return grouped_dfs


def merge_grouped_data(grouped_dfs: list) -> pd.DataFrame:
    """
    Merge multiple grouped DataFrames into one.

    Parameters
    ----------
    grouped_dfs : list
        A list of grouped DataFrames.

    Returns
    -------
    pd.DataFrame
        The merged DataFrame.
    """
    merged_df = grouped_dfs[0]
    
    for df in grouped_dfs[1:]:
        merged_df = pd.merge(merged_df, df, on=['aes_canton', 'education'], how='outer')
    
    return merged_df


def append_summary_to_df(df: pd.DataFrame) -> pd.DataFrame:
    """
    Append summary rows to DataFrame by summing up all data by education level.

    Parameters
    ----------
    df : pd.DataFrame
        The input DataFrame.

    Returns
    -------
    pd.DataFrame
        The updated DataFrame with summary rows.
    """
    summary_df = df.groupby('education').sum().reset_index()
    summary_df.drop('aes_canton', axis=1, inplace=True)
    summary_df['aes_canton'] = 'summary'
    
    final_df = pd.concat([df, summary_df], ignore_index=True)
    final_df.fillna(0.0, inplace=True)
    return final_df


def calculate_percentage(final_df: pd.DataFrame, group_cols: list) -> pd.DataFrame:
    """
    Convert counts to percentages of their respective totals.

    Parameters
    ----------
    final_df : pd.DataFrame
        The input DataFrame.
    group_cols : list
        List of columns to calculate percentages for.

    Returns
    -------
    pd.DataFrame
        The updated DataFrame with percentage values.
    """
    group_sums = final_df.groupby('aes_canton')[group_cols].transform('sum')
    
    for col in group_cols:
        final_df[col] = ((final_df[col] / group_sums[col]) * 100).round(1)
    
    return final_df


def save_to_csv(df: pd.DataFrame, file_path: str) -> None:
    """
    Save DataFrame to a CSV file.

    Parameters
    ----------
    df : pd.DataFrame
        The DataFrame to save.
    file_path : str
        The path to save the CSV file.

    Returns
    -------
    None
    """
    df.to_csv(file_path, index=False)


def create_details_dict(df: pd.DataFrame, waves: int) -> dict:
    """
    Create a nested dictionary from the DataFrame for detailed analysis.

    Parameters
    ----------
    df : pd.DataFrame
        The input DataFrame.
    waves : int
        The number of waves.

    Returns
    -------
    dict
        A nested dictionary with details for each canton and education level.
    """
    multi_index_df = df.set_index(['aes_canton', 'education'])
    details = {}
    
    for canton_id in multi_index_df.index.get_level_values('aes_canton').unique():
        canton_details = {}
        
        for edu_level in multi_index_df.xs(canton_id, level='aes_canton').index:
            canton_details[edu_level] = {f'w{wave}_edu': multi_index_df.loc[(canton_id, edu_level), f'w{wave}_edu'] for wave in range(1, waves + 1)}
        
        details[str(canton_id)] = canton_details
    
    return details


def sort_details_by_wave(details: dict, waves: int) -> dict:
    """
    Sort details by wave for better readability and analysis.

    Parameters
    ----------
    details : dict
        The input details dictionary.
    waves : int
        The number of waves.

    Returns
    -------
    dict
        A dictionary sorted by waves.
    """
    sorted_by_wave = {}
    
    for key, categories in details.items():
        sorted_by_wave[key] = {f'w{wave}_edu': {} for wave in range(1, waves + 1)}
        
        for category, wave_counts in categories.items():
            for wave, count in wave_counts.items():
                sorted_by_wave[key][wave][category] = count
    
    return sorted_by_wave


def add_language_summary(details: dict, df: pd.DataFrame, total: int) -> dict:
    """
    Add language region summaries to the details dictionary.

    Parameters
    ----------
    details : dict
        The details dictionary.
    df : pd.DataFrame
        The input DataFrame.
    total : int
        The total count of language regions.

    Returns
    -------
    dict
        The updated details dictionary with language summaries.
    """
    if 'summary' not in details:
        details['summary'] = {}

    details['summary']['GR'] = (df[df['aes_langreg'] == 'GR'].iloc[:, 0].count() / total * 100).round(1)
    details['summary']['FR'] = (df[df['aes_langreg'] == 'FR'].iloc[:, 0].count() / total * 100).round(1)
    details['summary']['IT'] = (df[df['aes_langreg'] == 'IT'].iloc[:, 0].count() / total * 100).round(1)
    
    return details


def create_summary(details: dict, waves: int) -> dict:
    """
    Create a summary dictionary from the detailed analysis.

    Parameters
    ----------
    details : dict
        The detailed dictionary.
    waves : int
        The number of waves.

    Returns
    -------
    dict
        The summary dictionary.
    """
    summary = {f'w{wave}_edu': {key: details['summary'][f'w{wave}_edu'][key] for key in details['summary'][f'w{wave}_edu'].keys()} for wave in range(1, waves + 1)}
    
    summary['lang'] = {key: details['summary'][key] for key in ['GR', 'FR', 'IT']}
    
    return summary


def save_summary_to_json(summary: dict, file_path: str) -> None:
    """
    Save summary dictionary to a JSON file.

    Parameters
    ----------
    summary : dict
        The summary dictionary.
    file_path : str
        The path to save the JSON file.

    Returns
    -------
    None
    """
    with open(file_path, 'w') as file:
        json.dump(summary, file, indent=4)


def currate(waves: int, file_path: str, currated_data_path:str, summary_path:str) -> None:
    """
    Process and curate data from a CSV file, saving the curated data and a summary to CSV and JSON files, respectively.

    Parameters
    ----------
    waves : int
        The number of waves to process.
    file_path : str
        The path to the CSV file.
    currated_data_path : str
        The path to which the currated data should be saved to. Must be a .csv file.
    summary_path : str
        The path to which the data summary should be saved to. Must be a .csv file.


    Returns
    -------
    None
    """
    # Load and clean the data
    merged_df = load_and_clean_data(file_path, waves)

    tiwt_keys = []
    Wi_edu_keys = []
    education_columns = []

    # Generate keys for weights and education columns for each wave
    for i in range(1, waves + 1):
        tiwt_keys.append(f't{i}wt')
        Wi_edu_keys.append(f'w{i}_edu')
        education_columns.append(f't{i}educ_class_1_r')

    # Convert and categorize education columns
    merged_df = convert_and_set_education(merged_df, education_columns)

    # Define columns to keep and filter the DataFrame
    columns_to_keep = ['aes_canton', 'aes_langreg'] + tiwt_keys + education_columns
    merged_df = filter_and_fill_data(merged_df, columns_to_keep)

    # Replace numerical language region codes with string labels
    merged_df = replace_language_region(merged_df, 'aes_langreg')

    # Group data by canton and education type, and calculate weighted counts
    grouped_dfs = group_and_calculate_weighted_counts(merged_df, 't1wt', education_columns)
    edu_count = merge_grouped_data(grouped_dfs)

    # Append summary rows to the DataFrame
    final_df = append_summary_to_df(edu_count)
    
    # Calculate percentage values for weighted counts
    final_df = calculate_percentage(final_df, Wi_edu_keys)

    # Save the final DataFrame to a CSV file
    save_to_csv(final_df, currated_data_path)

    # Create a nested dictionary with the study information
    details = create_details_dict(final_df, waves)
    details = sort_details_by_wave(details, waves)

    # Calculate the total count of language regions
    total = len(merged_df['aes_langreg'])

    # Add language region summaries to the details dictionary
    details = add_language_summary(details, merged_df, total)

    # Create a summary dictionary from the detailed analysis
    summary = create_summary(details, waves)

    # Save the summary dictionary to a JSON file
    save_summary_to_json(summary, summary_path)

    return details


if __name__ == '__main__' :
    details = currate(waves=3,
                      file_path='../study_data/TREE2_Data_IWI_Open_Data_Vorlesung_2023_nolabel.csv',
                      currated_data_path='../study_data/currated_data.csv',
                      summary_path='../study_data/summary.json')