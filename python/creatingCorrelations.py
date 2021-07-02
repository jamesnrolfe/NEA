import pandas as pd  # import the pandas module
import csv

# ================ settings =================

minPeriods = 20  # can be tested. 20 should give a good balence between over-correlations
# and under-correlations
inputEncoding = "ISO-8859-1"  # match to csv import file encoding

# ===========================================

# read the file under these column headers
r_cols = ["user_id", "movie_id", "rating"]
ratingsCSV = pd.read_csv(  # read the csv under the following conditionsa
    "python/dataset/ratings.csv",  # location of ratings file
    sep=',',  # for robustness define the separator of values
    names=r_cols,  # use headers from before
    encoding=inputEncoding
)

print(ratingsCSV.head(10))  # output first 10 rows of ratingsCSV

ratingsPT = ratingsCSV.pivot_table(
    index=["user_id"],  # rows have headers w/ user ids
    columns=["movie_id"],  # columns have headers w/ movie ids
    values="rating"  # cells contain rating values
)

print(ratingsPT.head(10))  # output first 10 rows of ratingsPT

corrMatrix = ratingsPT.corr(
    method="pearson",  # use the pearson correlation formula
    min_periods=minPeriods  # use our minPeriods from settings
)

print(corrMatrix.head(10))  # output first 10 rows of corrMatrix

corrMatrix.to_csv(
    "python/correlations/corrMatrix.csv",  # write our file to this location
    sep=",",
    quoting=csv.QUOTE_ALL,
    float_format="%.5f"  # only write to 5 sig. fig.s
)
