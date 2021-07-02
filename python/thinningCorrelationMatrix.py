import csv  # used to read file etc.


def readcsv(filepath):  # reading the csv into an array
    with open(filepath, "r") as f:  # get the file
        reader = csv.reader(f)  # get the content using csv reader
        content = list(reader)  # store the content in an array
    return content


def writecsv(filepath, table):  # writing to the csv from an array
    with open(filepath, "w", newline="") as f:  # write to an array
        # specify newline as "" to avoid line breaks which makes
        # database entry much simpler
        writer = csv.writer(f)
        writer.writerows(table)  # write the data from the input array
        # into the desired filepath row by row, which should give us
        # a nice csv format


def convert():
    # read our large correlation
    bigCM = readcsv("python/correlations/corrMatrix.csv")
    # matrix into an array: bigCM
    headers = bigCM[0]  # should be a list of all movies
    # the array that will store the thinned matrix
    thinCM = [["movie_1", "movie_2", "corr"]]
    # we can initialise it with the column headers
    # for all the rows in the large matrix except the first (as this is
    for x in bigCM[1:]:
        # just column headers i.e. movie titles)
        movie_1 = int(x[0])  # movie_1 is the row header/index
        for colIndex, corr in enumerate(x):  # for all columns in the row
            if corr == "":
                continue  # if there is no correlation, break
            if colIndex == 0:
                continue  # if we're looking at the first column, break
            # movie two is the header with the appropriate index
            movie_2 = int(headers[colIndex])
            # append the relevant information
            thinCM.append([movie_1, movie_2, float(corr)])
            # to the thin matrix
    writecsv("python/correlations/thinnedMatrix.csv", thinCM)


def main():
    convert()


main()
